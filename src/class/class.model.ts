import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { CharacterModel } from 'src/character/character.model';


export enum Element {
  WATER = 'WATER',
  FIRE = 'FIRE',
  AIR = 'AIR',
  EARTH = 'EARTH',
  DARK = 'DARK',
  LIGHT = 'LIGHT'
}

@ObjectType()
export class Hability {
  @Field()
  name: string;
  @Field()
  range: number;
  @Field()
  ṕowerLevel: number;
  @Field(type => Element)
  element: Element;
}

@ObjectType()
@Entity()
export class ClassModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(type => [CharacterModel], { nullable: true })
  @OneToMany(type => CharacterModel, character => character.class)
  character: CharacterModel[]

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Field(type => [Hability])
  @Column({
    type: 'jsonb',
    array: false,
    default: [],
    nullable: false,
  })
  habilities: Hability[];
}
