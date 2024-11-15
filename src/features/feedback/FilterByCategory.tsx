function FilterByCategory(): React.JSX.Element {
  return (
    <section>
      <h2>Filter Suggestions by category</h2> {/* visually hidden heading */}
      <button>All</button>
      <button>UI</button>
      <button>UX</button>
      <button>Bug</button>
      <button>Feature</button>
    </section>
  );
}

export default FilterByCategory;
