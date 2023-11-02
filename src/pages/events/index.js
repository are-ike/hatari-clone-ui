import React, { useEffect, useState } from "react";
import { eventApis } from "../../api/events";
import useSetParams from "../../hooks/useSetParams";
import { useQuery } from "react-query";
import loader from "../../assets/loader.svg";
import ErrorMessage from "../../components/error-message";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import Table from "../../components/table";

const columns = ["transaction ID", "created on", "user", "gateway", "amount"];

const Events = ({ project }) => {
  const [page, setPage] = useSetParams("page");
  const [openEventModal, setOpenEventModal] = useState({
    isOpen: false,
    eventId: null,
  });

  useEffect(() => {
    if (!page) setPage(1);
  }, [page]);

  const getEvents = useQuery({
    queryKey: ["events", page],
    queryFn: () => eventApis.getEvents({ page, projectId: project.id }),
    enabled: !!page,
    keepPreviousData: true,
  });

  const renderRows = (row) => {
    return (
      <>
        <td className="px-4">{row.transactionId}</td>
        <td className="p-4">
          {format(new Date(row.createdAt), "dd MMM, yyyy")}
        </td>
        <td className="py-2 px-4">
          <span className="truncate max-w-[200px] inline-block ">
            {row.user}
          </span>
        </td>
        <td className="flex gap-1 px-4 items-center h-[52px]">
          <span className="truncate max-w-[200px] inline-block ">
            {row.gateway}
          </span>
        </td>
        <td className="flex gap-1 px-4 items-center h-[52px]">
          <span className="truncate max-w-[200px] inline-block ">
            {row.amount}
          </span>
        </td>
      </>
    );
  };

  const render = () => {
    if (getEvents.isLoading)
      return (
        <div className="flex items-center justify-center h-[calc(100vh-256px)]">
          <img src={loader} alt="" width={40} height={40} />
        </div>
      );

    if (getEvents.isError)
      return (
        <div className="flex items-center justify-center h-[calc(100vh-256px)]">
          <ErrorMessage
            message={
              "An error occured while fetching events. Please try again."
            }
            refetch={getEvents.refetch}
          />
        </div>
      );

    if (getEvents.isSuccess) {
      return (
        <div className="">
          {!!getEvents.data?.events?.length ? (
            <Table
              columns={columns}
              rows={getEvents.data?.events}
              renderRows={renderRows}
              className="mt-4"
              onRowClick={(row) =>
                setOpenEventModal({ isOpen: true, eventId: row.id })
              }
              isLoading={getEvents.isFetching}
            />
          ) : (
            <p className="text-darkgrey font-medium my-8 text-center">
              No events found
            </p>
          )}

          {!!getEvents.data?.events?.length && (
            <ReactPaginate
              className="flex p-2 bg-white w-fit rounded mt-4 ml-auto items-center"
              pageLinkClassName="h-8 w-8 text-body flex items-center justify-center hover:bg-primary hover:text-white rounded"
              nextLabel={"Next >"}
              forcePage={page - 1}
              onPageChange={(e) => setPage(e.selected + 1)}
              pageRangeDisplayed={5}
              pageCount={getEvents.data?.totalPages}
              previousLabel={"< Previous"}
              previousLinkClassName="mr-2"
              nextLinkClassName="ml-2"
              disabledLinkClassName="text-darkgrey cursor-not-allowed"
              activeLinkClassName="bg-primary text-white"
            />
          )}
        </div>
      );
    }
  };

  return render();
};

export default Events;
