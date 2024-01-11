import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";
import Filter from "./../../ui/Filter";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filteredField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price (Low first)" },
          { value: "regularPrice-desc", label: "Sort by price(High first)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (Low first) " },
          { value: "maxCapacity-desc", label: "Sort by capacity (High first)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
