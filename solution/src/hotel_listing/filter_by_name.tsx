export function FilterByHotelName() {
  return (
    <section>
      <details>
        <summary>
          <h3>Hotel Name</h3>
        </summary>

        <div>
          <input type="text" />
          <button type="button" disabled={false}>
            Go
          </button>
        </div>
      </details>
    </section>
  );
}
