import { db, todosTable } from './db';
import { submit } from './actions';
import { sql } from 'drizzle-orm';

export default async function Home({ searchParams }) {
  const todos = await db
    .select({
      id: todosTable.id,
      text: todosTable.text,
      created_at: todosTable.created_at, // Retrieve created_at

    })
    .from(todosTable)
    .limit(20)
    .orderBy(searchParams.asc ? sql`${todosTable.id} ASC` : sql`${todosTable.id} DESC`);

  return (
    <main key={todos[0]?.id}>
      <h1>
        Emoji TODO{' '}
        <a href="https://github.com/rauchg/emoji-todo" target="_blank">
          source
        </a>
      </h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text} - {todo.created_at.toLocaleDateString()} at {todo.created_at.toLocaleTimeString()}</li>
        ))}
      </ul>

      <form action={submit}>
        <input
          type="text"
          placeholder="🫡 (only emojis allowed)"
          pattern="^[\p{Emoji}]+$"
          name="text"
          autoFocus
          maxLength="10"
          required
        />
        <button>✉️</button>
      </form>
    </main>
  );
}
