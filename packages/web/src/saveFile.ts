import isBlob from './isBlob';


declare global{
  interface Navigator {
    msSaveBlob:(blob: Blob, defaultName?: string) => boolean
  }
}



const MSSave = 'msSaveBlob' in navigator;



export function fileSavingSupported(): boolean {
  return 'Blob' in window && (MSSave || 'download' in HTMLAnchorElement.prototype);
}



/**
 * Creates a file with given content and triggers download.
 * (if the browser doesn't support file downloads, this method does nothing)
 *
 * @param content - The content of the file
 * @param name - The name to give the downloaded file
 * @param type - The content type of the file
 *
 * @example
 *
 * ```ts
 * saveFile('<File content>', 'my-file.txt')
 * saveFile(new Blob('<File content>'), 'my-file.txt')
 * ```
 */
export function saveFile(content: Blob | string, name: string, type = 'text/plain; charset=utf-8'): void {
  if (!fileSavingSupported()) { return; }

  if (!isBlob(content)) content = new Blob([`${content}`], { type });

  if (MSSave) {
    navigator.msSaveBlob(content);
  } else {
    const a = document.createElement('a');
    a.download = name;
    a.target = '_blank';
    a.href = URL.createObjectURL(content);
    a.click();
  }
}

export default saveFile;
