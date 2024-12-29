export function FilterByRating() {
  return (
    <section>
      <details>
        <summary>
          <h3>Quality Rating</h3>
        </summary>

        <ul>
          <li>
            <label>
              <input type="checkbox" />
              <span>All</span>
            </label>
          </li>

          <li>
            <label>
              <input type="checkbox" />
              <span>5 stars</span>
            </label>
          </li>

          <li>
            <label>
              <input type="checkbox" />
              <span>4 stars</span>
            </label>
          </li>

          <li>
            <label>
              <input type="checkbox" />
              <span>3 stars</span>
            </label>
          </li>

          <li>
            <label>
              <input type="checkbox" />
              <span>2 stars</span>
            </label>
          </li>
        </ul>
      </details>
    </section>
  );
}
