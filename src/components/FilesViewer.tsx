import { FC } from 'react';

import { FolderIcon, FolderOpenIcon, FileIcon } from 'components/icons';

interface IProps {
  files: any;
  onBack: any;
  onOpen: any;
}

const FilesViewer: FC<IProps> = ({ files, onBack, onOpen }: IProps) => {
  return (
    <>
      <table className="table">
        <tbody>
          <tr className="clickable" onClick={onBack}>
            <td className="icon-row">
              <FolderOpenIcon />
            </td>
            <td>...</td>
            <td></td>
          </tr>

          {files.map(({ name, directory, size }: any, i: number) => (
            <tr key={i} className="clickable" onClick={() => directory && onOpen(name)}>
              <td className="icon-row">
                {directory ? <FolderIcon /> : <FileIcon />}
              </td>
              <td>{name}</td>
              <td>
                <span className="float-end">{size}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default FilesViewer;
