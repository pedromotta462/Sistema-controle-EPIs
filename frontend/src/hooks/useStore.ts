import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useStore = create(
    persist(
        (set) => ({
            //user object
            user: {},
            setUser: (user: any) => set({ user }),
            updateUserData: (data: any) => set((state: { user: any }) => ({ user: { ...state.user, ...data } })),
            clearUser: () => {
                set({ user: {} });
                set({ notificationsCount: 0 });
            },

            notificationsCount: 0,
            setNotificationsCount: (count: number) => set({ notificationsCount: count }),
            clearNotificationsCount: () => set({ notificationsCount: 0 }),

            /*
            // Estado para armazenar os dados da redação corrigida
            essayData: null,
            setEssayData: (data: any) => set({ essayData: data }),
            clearEssayData: () => set({ essayData: null }),
            
             // Estado para armazenar as questões do quiz
            quizQuestions: [],
            setQuizQuestions: (questions: any[]) => set({ quizQuestions: questions }),
            clearQuizQuestions: () => set({ quizQuestions: [] }),
            */
        }),
        {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useStore;
