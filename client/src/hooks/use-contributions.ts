import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { InsertContribution, Contribution } from "@shared/schema";

export const useContributions = () => {
  const queryClient = useQueryClient();

  const { data: contributions, isLoading } = useQuery<Contribution[]>({
    queryKey: ["/api/contributions"],
  });

  const { data: totalContributions, isLoading: isTotalLoading } = useQuery<{ total: number }>({
    queryKey: ["/api/contributions/total"],
  });

  const { mutateAsync: createContribution, isPending } = useMutation({
    mutationFn: async (data: InsertContribution) => {
      const res = await apiRequest("POST", "/api/contributions", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contributions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/contributions/total"] });
    },
  });

  return {
    contributions,
    isLoading,
    totalContributions: totalContributions?.total || 0,
    isTotalLoading,
    createContribution,
    isPending,
  };
};
