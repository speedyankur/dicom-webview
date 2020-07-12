export interface Instance {
  FileSize:number,
  FileUuid: string,
  ID: string,
  IndexInSeries: number
  MainDicomTags:{
    InstanceNumber:string,
    NumberOfFrames:string,
    SOPInstanceUID:string
  },
  ParentSeries:string,
  Type:"Series"
}
