import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: async ({ bookingId, breakfast }) => {
      try {
        const data = await updateBooking(bookingId, {
          status: "checked-in",
          isPaid: true,
          ...breakfast,
        });

        return data;
      } catch (error) {
        throw new Error("Error updating booking");
      }
    },
    onSuccess: (data) => {
      if (data && data.id) {
        toast.success(`Booking #${data.id} successfully checked in`);
      } else {
        console.error("Invalid data structure after check-in:", data);
        toast.error("There was an error checking in");
      }

      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => toast.error("There was an error checking in"),
  });

  return { checkin, isCheckingIn };
}
