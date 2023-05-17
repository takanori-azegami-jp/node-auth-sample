-- スキーマ作成
CREATE SCHEMA ex_schema;

-- テーブル作成
CREATE TABLE  ex_schema.ex_table (
  col1 VARCHAR(10),
  col2 VARCHAR(10),
  col3 VARCHAR(10),
  PRIMARY KEY (col1)
);

-- データ追加
INSERT INTO ex_schema.ex_table VALUES('111', 'aaa', 'あああ');
INSERT INTO ex_schema.ex_table VALUES('222', 'bbb', 'いいい');
INSERT INTO ex_schema.ex_table VALUES('333', 'ccc', 'ううう');