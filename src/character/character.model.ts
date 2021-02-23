
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, ChildEntity } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { ClassModel } from 'src/class/class.model';

export enum Race {
  HUMAN = "HUMAN",
  ELF = "ELF",
  DWARF = "DWARF",
  GOBLIN = "GOBLIN"
}
export enum LifeStatus {
  ALIVE = "ALIVE",
  UNDEAD = "UNDEAD",
  GHOST = "GHOST"
}

@ObjectType()
export class Item {
  @Field()
  description: string;
  @Field()
  rate: number;
  @Field()
  quantity: number
}

@ObjectType()
@Entity()
export class CharacterModel {

  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field()
  @Column({ length: 500, nullable: false })
  name: string;

  @Field()
  @Column({
    type: "enum",
    enum: LifeStatus,
    default: LifeStatus.ALIVE
  })
  lifeStatus: LifeStatus;

  @Field()
  @Column({
    type: "enum",
    enum: Race,
  })
  race: Race;

  @Field(type => [Item])
  @Column({
    type: 'jsonb',
    array: false,
    default: [],
    nullable: false,
  })
  items: Item[];

  @Field()
  @Column()
  healthPoints: number;

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(type => ClassModel)
  @ManyToOne(type => ClassModel, classModel => classModel.character)
  class: ClassModel;

}