import FilesViewer from 'components/FilesViewer';
import { FC, useState, useMemo } from 'react';

const fs = window.require('fs');
const pathModule = window.require('path');

const { app } = window.require('@electron/remote');

const formatSize = (size: any) => {
  let i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    ((size / Math.pow(1024, i)) * 1).toFixed(2) +
    ' ' +
    ['B', 'KB', 'MB', 'GB', 'TB'][i]
  );
};

const App: FC = () => {
  const [path, setPath] = useState(app.getAppPath());
  const [searchString, setSearchString] = useState('');
  const [files, setFiles] = useState([]);

  useMemo(() => {
    let _files = fs
      .readdirSync(path)
      .map((file: any) => {
        const stats = fs.statSync(pathModule.join(path, file));
        return {
          name: file,
          size: stats.isFile() ? formatSize(stats.size ?? 0) : null,
          directory: stats.isDirectory(),
        };
      })
      .sort((a: any, b: any) => {
        if (a.directory === b.directory) {
          return a.name.localeCompare(b.name);
        }
        return a.directory ? -1 : 1;
      });
    setFiles(_files);
  }, [path]);

  const filteredFiles = files.filter((file: any) => file.name.startsWith(searchString));

  const onBack = () => setPath(pathModule.dirname(path));
  const onOpen = (folder: any) => setPath(pathModule.join(path, folder));

  return (
    <>
      <div className="container mt-2">
        <h4>{path}</h4>
        <div className="form-group mt-4 mb-2">
          <input
            className="form-control form-control-sm"
            placeholder="File search"
            onChange={e => setSearchString(e.target.value)}
            value={searchString}
          />
        </div>
        <FilesViewer files={filteredFiles} onBack={onBack} onOpen={onOpen} />
      </div>
    </>
  );
};

export default App;
