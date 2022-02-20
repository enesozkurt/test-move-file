// Please update this type as same as with the data shape.

interface IFolder {
  id: string;
  name: string;
  files: IFile[];
}

interface IFile {
  id: string;
  name: string;
}

type List = IFolder[];

export default function move(list: List, source: string, destination: string): List {
  // if given source is not a file
  const givenSource = list.find((item) => item.files.some((file) => file.id === source));

  // Find methodu geriye tek bir elemanı obje olarak dönmektedir. Eğer eşleşen herhangi bir kayıt bulamazsa geriye “undefined” döndürür.
  if (givenSource === undefined) {
    throw new Error('You cannot move a folder');
  }

  // find given source index
  const givenSourceIndex = givenSource?.files.findIndex((file) => file.id === source);
  // Data içerisinde eşleşen ilk kaydın sıra numarasını verir, eğer herhangi bir kayıt bulunamazsa geriye -1 değerini verir.

  // if given destination is not a folder
  const givenDestination = list.find((item) => item.id === destination);
  if (givenDestination === undefined) {
    throw new Error('You cannot specify a file as the destination');
  }

  const movingFile = givenSource.files[givenSourceIndex];

  givenDestination.files.push(movingFile);
  givenSource.files.splice(givenSourceIndex, 1);

  return list;
}
