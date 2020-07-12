export interface PatientDicomTags {
    PatientBirthDate:Date,
    PatientID: string,
    PatientName: string,
    PatientSex: "M"|"F"

}
export interface Patient {
  ID: string,
  IsStable: boolean,
  LastUpdate:Date,
  MainDicomTags:PatientDicomTags,
  Studies:string[],
  Type:"Patient"
}
