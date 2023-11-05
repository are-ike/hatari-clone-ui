import React from "react";
import Modal from ".";
import { format } from "date-fns";
import Tag from "../tag";

const EventModal = ({ open, setOpen }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: open.event?.currency ?? "ngn",
  });

  const onClose = () => {
    setOpen((state) => ({
      ...state,
      isOpen: false,
    }));
  };

  return (
    <Modal isEventModal open={open.isOpen} setOpen={onClose}>
      <div className="rounded-lg bg-white flex gap-8 p-8 w-[800px]">
        <div className="flex flex-col gap-4 w-[50%]">
          <div>
            <p className="font-semibold text-sm mb-1">Transaction ID</p>
            <p>{open.event?.transaction_id}</p>
          </div>
          <div>
            <p className="font-semibold text-sm mb-1">Transaction Type</p>
            <p>{open.event?.type}</p>
          </div>
          <div>
            <p className="font-semibold text-sm mb-1">Amount</p>
            <p>{formatter.format(open.event?.amount)}</p>
          </div>

          <div>
            <p className="font-semibold text-sm mb-1">Action</p>
            <Tag type={open.event?.action !== "block"} className="!py-2">
              {open.event?.action}
            </Tag>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-[50%]">
          <div>
            <p className="font-semibold text-sm mb-1">User name</p>
            <p>{open.event?.user}</p>
          </div>
          <div>
            <p className="font-semibold text-sm mb-1">Gateway</p>
            <p>{open.event?.gateway}</p>
          </div>
          <div>
            <p className="font-semibold text-sm mb-1">Country</p>
            <p>{open.event?.country}</p>
          </div>

          <div>
            <p className="font-semibold text-sm mb-1">Created At</p>
            <p>
              {format(
                open.event?.createdAt
                  ? new Date(open.event?.createdAt)
                  : new Date(),
                "dd MMM, yyyy"
              )}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EventModal;
