import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/home/Home'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ColorVariantsContext } from './contexts/Contexts'

const queryClient = new QueryClient()
const colorVariants: {[color: string]: string[]} = {
    green: ["bg-green-400", "bg-green-300", "text-green-600", 'text-green-300'],
    red: ["bg-red-400", "bg-red-300", "text-red-600", "text-red-300"],
    black: ["bg-gray-800", "bg-gray-500", "text-gray-600", "text-gray-300"],
    blue: ["bg-blue-400", "bg-blue-300", "text-blue-600", "text-blue-300"],
    brown: ["bg-amber-800", "bg-amber-500", "text-amber-600", "text-amber-300"],
    clear: ["bg-slate-100", "bg-slate-200", "text-slate-600", "text-slate-300"],
    gray: ["bg-gray-400", "bg-gray-300", "text-gray-600", "text-gray-300"],
    pink: ["bg-pink-400", "bg-pink-300", "text-pink-600", "text-pink-300"],
    purple: ["bg-purple-400", "bg-purple-300", "text-purple-600", "text-purple-300"],
    white: ["bg-slate-50", "bg-slate-100", "text-slate-600", "text-slate-300"],
    yellow: ["bg-yellow-400", "bg-yellow-300", "text-yellow-600", "text-yellow-300"],
    gold: ["bg-orange-300", "bg-orange-200", "text-orange-600", "text-orange-300"],
    silver: ["bg-slate-200", "bg-slate-300", "text-slate-600", "text-slate-300"],
    indigo: ["bg-indigo-400", "bg-indigo-300", "text-indigo-600", "text-indigo-300"],
    lightblue: ["bg-sky-400", "bg-sky-300", "text-sky-600", "text-sky-300"],
    darkgreen: ["bg-green-700", "bg-green-500", "text-green-600", "text-green-300"],
    darkblue: ["bg-blue-700", "bg-blue-500", "text-blue-600", "text-blue-300"]
}

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <ColorVariantsContext.Provider value={colorVariants}>
            <BrowserRouter>
            <Routes>
                <Route index element={<Home />}>
                </Route>
            </Routes>
            </BrowserRouter>
        </ColorVariantsContext.Provider>
    </QueryClientProvider>
)
