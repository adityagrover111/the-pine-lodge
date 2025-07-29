import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import {
  HiArrowDownOnSquare,
  HiArrowRightCircle,
  HiArrowUpOnSquare,
  HiEye,
  HiOutlineTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

const ActionGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  margin-right: 1.5rem;
`;
const IconButton = styled.button`
  background: none;
  border: none;

  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transition: background-color 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-grey-600);
  }
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <ActionGroup>
        <IconButton
          title="See Details"
          onClick={() => navigate(`/bookings/${bookingId}`)}
        >
          <HiEye />
        </IconButton>

        {status === "unconfirmed" && (
          <IconButton
            title="Check In"
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            <HiArrowDownOnSquare />
          </IconButton>
        )}
        {status === "checked-in" && (
          <IconButton
            title="Check out"
            disabled={isCheckingOut}
            onClick={() => checkout(bookingId)}
          >
            <HiArrowUpOnSquare />
          </IconButton>
        )}
        <IconButton
          title="Delete"
          disabled={isDeleting}
          onClick={() => deleteBooking(bookingId)}
        >
          <HiOutlineTrash />
        </IconButton>
      </ActionGroup>
    </Table.Row>
  );
}

export default BookingRow;
