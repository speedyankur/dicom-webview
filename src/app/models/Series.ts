export interface Series {
  ExpectedNumberOfInstances:string,
  ID: string,
  Instances: string[],
  IsStable: boolean,
  LastUpdate:Date,
  MainDicomTags:{
    ImagesInAcquisition:string,
    Manufacturer:string,
    Modality:string,
    ProtocolName:string,
    SeriesDate:Date,
    SeriesDescription:string,
    SeriesInstanceUID:string,
    SeriesNumber: string,
    SeriesTime:string,
    StationName: string
  },
  ParentStudy:string,
  Status:string,
  Type:"Series"
}
