import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Role } from './Roles.Shema';
import {Leave} from "../../conges/Schema/Leaves.schema";
import {Attendance} from "../../attendance/Schema/Attendance.schema";
import { Tasks } from 'src/project/schema/Tasks.schema';
import { Teams } from 'src/teams/schema/Teams.schema';
import { Project } from 'src/project/schema/Project.schema';

export enum ReviewLevel {
  Outstanding = "Outstanding",
  Excellent = "Excellent",
  VeryGood = "Very Good",
  Good = "Good",
  Satisfactory = "Satisfactory",
  Average = "Average",
  BelowAverage = "Below Average",
  Unsatisfactory = "Unsatisfactory",
  Poor = "Poor",
  Unacceptable = "Unacceptable"
}



@Schema({
    timestamps: true,
  })
  export class User extends Document{
      @Prop()
      firstName:string;

      @Prop()
      lastName:string;

      @Prop( {unique:[true,"duplicated email entred"]})
      email: string;

      @Prop()
      password: string;

      @Prop({ default: true })
      isActive: boolean;

      @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' }})
      role: Role ;

      @Prop({ type: String, default: null })
      pinCode: string;

      @Prop()
      etablissement : string

      @Prop()
      Matricule : string ;
      
      @Prop()
      EmailSecondaire : string

      @Prop()
      TelSecondaire : string

      @Prop()
      dateEntree : string ;
      

      @Prop()
      Tel : string

      @Prop()
      fonction : string
     
      @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: ()=>Leave }] })
      leaves:Leave [];

      @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }] })
      attendances: Attendance[];

      @Prop()
      soldeConges : number ;

      @Prop()
      soldeMaladie : number ;
      @Prop()
    reviewClient: ReviewLevel ;

      @Prop({nullable: true})
      profileImage: string;
      @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: ()=>Tasks }] })
      tasks:Tasks []; 
      @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Teams'} )
      teams:Teams ; 
      @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: ()=>Performance }] )
      performances:Performance []; 
      @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: ()=>Project }] )
      projects:Project []; 


  }

    export const  UserSchema=SchemaFactory.createForClass(User);
