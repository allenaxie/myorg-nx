import styles from './fabricjs-editor.module.css';

/* eslint-disable-next-line */
export interface FabricjsEditorProps {}

export function FabricjsEditor(props: FabricjsEditorProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to FabricjsEditor!</h1>
    </div>
  );
}

export default FabricjsEditor;
