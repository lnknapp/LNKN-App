export enum FileExportType {
  csv, excel, Report
}

export interface FileExportBase {
  type: FileExportType;
  iconClass: string;
  label: string;
  contentType: string;
  fileExtension: string;
}

export const FileExportFactory = [
  { type: FileExportType.csv, iconClass: "fa fa-file-alt", label: "CSV", contentType: "text/csv", fileExtension: "csv" } as FileExportBase,
  { type: FileExportType.excel, iconClass: "fa fa-file-excel", label: "Excel", contentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileExtension: "xlsx" } as FileExportBase,
  { type: FileExportType.Report, iconClass: "fa fa-file-pdf", label: "Report", contentType: "application/pdf", fileExtension: "pdf" } as FileExportBase,
];

export interface FileStructure {
  name: string;
  data: Blob;
}

export interface FileExport extends FileExportBase {
  url: string;
}

export default FileExportFactory;