<?php declare(strict_types=1);

namespace app;

class Database
{
    /**
     * Содержит обЪект PDO
     *
     * @var \PDO
     */
    private     $pdo;
    /**
     * Содержит статус подключения к БД, (true - подключено, false - не подключено)
     *
     * @var boolean
     */
    private     $connected;
    /**
     * Хранит подгатовленный запрос
     *
     * @var \PDOStatement
     */
    private     $statement;
    /**
     * Содержит настройки подключения к БД
     *
     * @var array
     */
    protected   $settings = [];
    /**
     * Содержит параметры SQL запроса
     *
     * @var array
     */
    private     $paremeters = [];

    /**
     * Database constructor.
     * @param array $settings
     */
    public function __construct(array $settings){
        $this -> settings = $settings;
        $this -> connect();
    }

    private function connect(){
        $dsn = "mysql:host={$this->settings['host']};dbname={$this->settings['dbname']}";

        try{
            $this -> pdo = new \PDO($dsn, $this->settings['user'], $this->settings['password'],
                [
                    \PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES {$this->settings['charset']}"
                ]);
            $this -> pdo -> setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            $this -> pdo -> setAttribute(\PDO::ATTR_EMULATE_PREPARES, false);

            $this -> connected = true;
        }
        catch (\PDOException $e){
            exit($e -> getMessage());
        }
    }

    public function close(){
        $this->pdo = null;
    }

    /**
     * @param string $query
     * @param array $parameters
     */
    private function init(string $query, array $parameters = []){
        if(!$this->connected){
            $this->connect();
        }

        try{
            $this->statement = $this->pdo->prepare($query);
            $this->bind($parameters);

            if(!empty($this->paremeters)){
                foreach($this->paremeters as $param => $value){
                    if(is_int($value[1])){
                        $type = \PDO::PARAM_INT;
                    }
                    elseif (is_bool($value[1])){
                        $type = \PDO::PARAM_BOOL;
                    }
                    elseif (is_null($value[1])){
                        $type = \PDO::PARAM_NULL;
                    }
                    else{
                        $type = \PDO::PARAM_STR;
                    }
                    $this->statement->bindValue($value[0], $value[1], $type);
                }
            }
            $this->statement->execute();
        }

        catch(\PDOException $e){
            exit($e->getMessage());
        }
        $this->paremeters = [];
    }

    /**
     * @param array $parameters
     */
    private function bind(array $parameters): void {
        if(!empty($parameters) && is_array($parameters)){
            $columns = array_keys($parameters);
            foreach($columns as $i => &$column){
                $this->paremeters[sizeof($this->paremeters)] = [
                    ":{$column}",
                    $parameters[$column]
                ];
            }
        }
    }

    /**
     * @param string $query
     * @param array $parameters
     * @param int $mode
     * @return array|int|null
     */
    public function query(string $query, array $parameters = [], $mode = \PDO::FETCH_ASSOC){
        $query = trim(str_replace('\r', '', $query));
        $this->init($query, $parameters);
        $rawStatement = explode(' ', preg_replace('/\s+|\t+|\n+/', ' ', $query));
        $statement = strtolower($rawStatement[0]);

        if($statement === 'select' || $statement === 'show'){
            return $this->statement->fetchAll($mode);
        }
        elseif($statement === 'insert' || $statement === 'update' || $statement === 'delete'){
            return $this->statement->rowCount();
        }
        else{
            return null;
        }
    }

    /**
     * @return string
     */
    public function lastInsertId(){
        return $this->pdo->lastInsertId();
    }
}