import React from "react";
// import styled from "styled-components";
import { useTable, usePagination, useRowSelect } from "react-table";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
// import { useAppContext } from "../context/GlobalContext";
import Checkbox from "@mui/material/Checkbox";
import { deleteMissing, updateStateMissings } from "../DataBase";
import Swal from "sweetalert2";

export function Table({ columns, data, name }) {
  // const { deleteMissing, missings, updateStateMissing } = useAppContext();
  // console.log(missings);

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: <div>Completado</div>,
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              {row.original.complete ? (
                <Checkbox
                  checked
                  onChange={() =>
                    updateStateMissings(
                      name,
                      row.original.id,
                      row.original.complete
                    )
                  }
                />
              ) : (
                <Checkbox
                  type={"checkbox"}
                  onChange={() =>
                    updateStateMissings(
                      name,
                      row.original.id,
                      row.original.complete
                    )
                  }
                />
              )}
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  // Render the UI for your table
  return (
    <>
      <pre>
        <code className="hidden">
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <>
                <tr className="" key={i} {...row.getRowProps()}>
                  {row.cells.map((cell, i) => {
                    return (
                      <>
                        <td key={i} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      </>
                    );
                  })}

                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    className="px-2 my-2 hidden sm:flex"
                    onClick={() => {
                      Swal.fire({
                        title: "Estas seguro que deseas borrarlo?",
                        text: "¡No podrás revertir esto!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "¡Sí, bórralo!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire(
                            "Eliminado!",
                            `El faltante ${row.original.medicine} ha sido eliminado`,
                            "success"
                          );
                          deleteMissing(name, row.original.id);
                        }
                      });
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination mt-5 border-t-2 pt-5 flex flex-wrap sm:flex-no-wrap gap-1 sm:gap-4 justify-center text-center">
        <Button
          variant="contained"
          size="small"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </Button>{" "}
        <Button
          variant="contained"
          size="small"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </Button>{" "}
        <Button
          variant="contained"
          size="small"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </Button>{" "}
        <Button
          variant="contained"
          size="small"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </Button>{" "}
        <span className="w-full sm:w-auto ">
          Pagina{" "}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Ir a la página:{" "}
          <input
            className="border rounded-lg"
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              ver {pageSize}
            </option>
          ))}
        </select>
      </div>

      <pre className="hidden">
        <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              "selectedFlatRows[].original": selectedFlatRows.map(
                (d) => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
}
