import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";


export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: async (bookingId) => {
      if (!bookingId) {
        throw new Error("Booking ID is required");
      }

      try {
        const data = await updateBooking(bookingId, {
          status: "checked-out",
        });

        return data;
      } catch (error) {
        throw new Error("Error updating booking");
      }
    },

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: () => toast.error("There was an error while checking out"),
  });

  return { checkout, isCheckingOut };
}
