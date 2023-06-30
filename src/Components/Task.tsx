import styles from './Task.module.css';
import trash from '../assets/trash.svg';

interface TaskProps {
    id: number,
    title: string,
    isComplete: boolean,
    onCompleteTask: (id: number) => void,
    onRemoveTask: (id: number) => void
}

export function Task({ id, title, isComplete, onCompleteTask, onRemoveTask }: TaskProps) {

    function handleCompleteTask() {
        onCompleteTask(id)
    }

    function handleRemoveTask() {
        onRemoveTask(id)
    }

    return (
        <div className={styles.task} key={id}>
            <div className={styles.taskTitle}>
                <input type="checkbox" checked={isComplete} onChange={handleCompleteTask} />
                <p>{title}</p>
            </div>
            <button onClick={handleRemoveTask} ><img src={trash} /></button>
        </div>
    )
}