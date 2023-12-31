import React, { useEffect, useState } from "react";
import { eventApis } from "../../api/events";
import useSetParams from "../../hooks/useSetParams";
import { useQuery } from "react-query";
import loader from "../../assets/loader.svg";
import ErrorMessage from "../../components/error-message";
import { format } from "date-fns";
import ReactPaginate from "react-paginate";
import Table from "../../components/table";
import EventModal from "../../components/modal/event-modal";

const columns = ["transaction ID", "created on", "user", "gateway", "amount"];

const Events = ({ project }) => {
  const [page, setPage] = useSetParams("page");
  const [openEventModal, setOpenEventModal] = useState({
    isOpen: false,
    event: null,
  });

  useEffect(() => {
    if (!page) setPage(1);
  }, [page]);

  const formatAmount = (amount, currency) => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    });

    return formatter.format(amount);
  };

  const getEvents = useQuery({
    queryKey: ["events", page],
    queryFn: () => eventApis.getEvents({ page, projectId: project.id }),
    enabled: !!page,
    keepPreviousData: true,
  });

  const renderRows = (row) => {
    return (
      <>
        <td className="px-4">
          <span className="truncate max-w-[200px] inline-block ">
            {row.transaction_id}
          </span>
        </td>
        <td className="p-4">
          {format(new Date(row.createdAt), "dd MMM, yyyy")}
        </td>
        <td className="px-4">
          <span className="truncate max-w-[200px] inline-block ">
            {row.user}
          </span>
        </td>
        <td className="px-4">
          <span className="truncate max-w-[200px] inline-block ">
            {row.gateway}
          </span>
        </td>
        <td className="px-4">
          <span className="truncate max-w-[200px] inline-block ">
            {formatAmount(row.amount, row.currency)}
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
        <div>
          <EventModal open={openEventModal} setOpen={setOpenEventModal} />
          <div className="py-6 px-10 bg-white rounded-lg">
            {!!getEvents.data?.events?.length ? (
              <Table
                columns={columns}
                rows={getEvents.data?.events}
                renderRows={renderRows}
                className="mt-4"
                onRowClick={(row) =>
                  setOpenEventModal({ isOpen: true, event: row })
                }
                isLoading={getEvents.isFetching}
              />
            ) : (
              <p className="text-darkgrey font-medium my-8 text-center">
                No events found
              </p>
            )}
          </div>

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
              previousLinkClassName="mr-2 text-sm"
              nextLinkClassName="ml-2 text-sm"
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
