import { FC } from 'react';

import file from 'assets/images/file.png';
import folder from 'assets/images/folder.png';
import folderOpen from 'assets/images/folderOpen.png';

export const FileIcon: FC = () => {
  return (
    <div className="icon">
      <img className="icon-img" src={file} alt="file" />
    </div>
  );
};

export const FolderIcon: FC = () => {
  return (
    <div className="icon">
      <img className="icon-img" src={folder} alt="folder" />
    </div>
  );
};

export const FolderOpenIcon: FC = () => {
  return (
    <div className="icon">
      <img className="icon-img" src={folderOpen} alt="folder-open" />
    </div>
  );
};
