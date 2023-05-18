import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

//Userクラスをエンティティと指定する
@Entity()
export class User {
//プライマリキーが自動的に生成される
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  mail: string;

  @Column()
  password: string;

//レコードの作成日が自動で挿入されるデコレーター
  @CreateDateColumn()
  createdAt: Date;

//レコードの更新日が自動で挿入されるデコレーター
  @UpdateDateColumn()
  updatedAt: Date;
}
