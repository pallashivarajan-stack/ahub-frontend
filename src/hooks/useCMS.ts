import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';

// --- Hero ---
export const useHero = () => {
  return useQuery({
    queryKey: ['hero'],
    queryFn: async () => {
      const { data } = await api.get('/api/v1/hero');
      return data;
    },
  });
};

export const useUpdateHero = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.put('/api/v1/hero', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['hero'] });
    },
  });
};

// --- Portfolio Companies ---
export const useCompanies = () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const { data } = await api.get('/api/v1/companies');
      return data;
    },
  });
};

export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post('/api/v1/companies', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
  });
};

export const useUpdateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      const { data } = await api.put(`/api/v1/companies/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
  });
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/v1/companies/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
    },
  });
};

// --- Incubators ---
export const useIncubators = () => {
  return useQuery({
    queryKey: ['incubators'],
    queryFn: async () => {
      const { data } = await api.get('/api/v1/incubators');
      return data;
    },
  });
};

export const useCreateIncubator = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post('/api/v1/incubators', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incubators'] });
    },
  });
};

export const useUpdateIncubator = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      const { data } = await api.put(`/api/v1/incubators/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incubators'] });
    },
  });
};

export const useDeleteIncubator = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/v1/incubators/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incubators'] });
    },
  });
};

// --- Events ---
export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const { data } = await api.get('/api/v1/events');
      return data;
    },
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post('/api/v1/events', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      const { data } = await api.put(`/api/v1/events/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/v1/events/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};

// --- Awards ---
export const useAwards = () => {
  return useQuery({
    queryKey: ['awards'],
    queryFn: async () => {
      const { data } = await api.get('/api/v1/awards');
      return data;
    },
  });
};

export const useCreateAward = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post('/api/v1/awards', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['awards'] });
    },
  });
};

export const useUpdateAward = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      const { data } = await api.put(`/api/v1/awards/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['awards'] });
    },
  });
};

export const useDeleteAward = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/v1/awards/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['awards'] });
    },
  });
};

// --- Statistics ---
export const useStatistics = () => {
  return useQuery({
    queryKey: ['statistics'],
    queryFn: async () => {
      const { data } = await api.get('/api/v1/statistics');
      return data;
    },
  });
};

export const useCreateStatistic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post('/api/v1/statistics', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
    },
  });
};

export const useUpdateStatistic = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      const { data } = await api.put(`/api/v1/statistics/${id}`, formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['statistics'] });
    },
  });
};

// --- Social Links ---
export const useSocialLinks = () => {
  return useQuery({
    queryKey: ['socialLinks'],
    queryFn: async () => {
      const { data } = await api.get('/api/v1/social-links');
      return data;
    },
  });
};

export const useCreateSocialLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post('/api/v1/social-links', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['socialLinks'] });
    },
  });
};

export const useUpdateSocialLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      const { data } = await api.put(`/api/v1/social-links/${id}`, formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['socialLinks'] });
    },
  });
};

export const useDeleteSocialLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/v1/social-links/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['socialLinks'] });
    },
  });
};

// --- Media ---
export const useMedia = () => {
  return useQuery({
    queryKey: ['media'],
    queryFn: async () => {
      const { data } = await api.get('/api/v1/media');
      return data;
    },
  });
};

export const useUploadMedia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post('/api/v1/media', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
    },
  });
};

export const useDeleteMedia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/v1/media/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
    },
  });
};
