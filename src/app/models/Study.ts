import { PatientDicomTags} from './Patient'
export interface Study {
  ID: string,
  IsStable: boolean,
  LastUpdate:Date,
  MainDicomTags:{
    AccessionNumber:string,
    InstitutionName:string,
    ReferringPhysicianName:string,
    StudyDate:Date,
    StudyDescription:string,
    StudyID:string,
    StudyInstanceUID: string,
    StudyTime:string
  },
  ParentPatient:string,
  PatientMainDicomTags:PatientDicomTags,
  Series:string[],
  Type:"Study"
}
