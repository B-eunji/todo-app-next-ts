'use client';

import Image from 'next/image';
import styles from './TodoList.module.css';
import type { Todo } from '@/types/todo';
import TodoItem from './TodoItem';

// 이미지 경로
const EMPTY_TODO_IMG = '/images/empty-pencil.png';   // 연필 든 구름
const EMPTY_DONE_IMG = '/images/empty.png'; // 기쁜 구름

/** 할 일 리스트(TO DO / DONE 두 컬럼) */
export default function TodoList({
  todos,
  onToggle,
}: {
  todos: Todo[];
  onToggle: (t: Todo) => void | Promise<void>;
}) {
  const todo = todos.filter(t => !t.done);
  const done = todos.filter(t => t.done);

  return (
    <section className={styles.list}>
      {/* TO DO 그룹 */}
      <div className={styles.group}>
        <header className={styles.groupHeader}>
          <Image src="/images/todo.svg" alt="TO DO" width={101} height={36} className={styles.chipImg} priority />
        </header>

        {todo.length === 0 ? (
          <div className={styles.empty}>
            <Image
              src={EMPTY_TODO_IMG}
              alt="할 일이 없어요"
              width={240}
              height={240}
              className={styles.emptyImg}
              priority
            />
            <p className={styles.emptyText}>
              할 일이 없어요. <br /> TODO를 새롭게 추가해보세요!
            </p>
          </div>
        ) : (
          <ul className={styles.items}>
            {todo.map(t => (
              <li key={t.id}>
                <TodoItem todo={t} onToggle={() => onToggle(t)} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* DONE 그룹 */}
      <div className={styles.group}>
        <header className={styles.groupHeader}>
          <Image src="/images/done.svg" alt="DONE" width={101} height={36} className={styles.chipImg} />
          {/* <span className={styles.count} aria-label={`완료 ${done.length}개`}>
            {done.length}
          </span> */}
        </header>
        
        {done.length === 0 ? (
          <div className={styles.empty}>
            <Image
              src={EMPTY_DONE_IMG}
              alt="완료된 일이 없어요"
              width={200}
              height={200}
              className={styles.emptyImg}
              priority
            />
            <p className={styles.emptyText}>
              아직 완료한 일이 없어요. <br /> 해야 할 일을 체크해보세요!
            </p>
          </div>
        ) : (
          <ul className={styles.items}>
            {done.map(t => (
              <li key={t.id}>
                <TodoItem todo={t} onToggle={() => onToggle(t)} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}