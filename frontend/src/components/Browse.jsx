import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Button } from './ui/button';
import { Search } from 'lucide-react';

// const randomJobs = [1, 2,45];

const Browse = () => {
    useGetAllJobs();
    const {allJobs, searchedQuery} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    const [query, setQuery] = useState(searchedQuery || "");
    const [filteredJobs, setFilteredJobs] = useState([]);
    
    // Sync local query state with Redux when searchedQuery changes (from external navigation)
    useEffect(() => {
        setQuery(searchedQuery || "");
    }, [searchedQuery]);
    
    // Filter jobs based on search query
    useEffect(() => {
        if (searchedQuery) {
            const filtered = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.company?.name.toLowerCase().includes(searchedQuery.toLowerCase())
            });
            setFilteredJobs(filtered);
        } else {
            setFilteredJobs([]);
        }
    }, [allJobs, searchedQuery]);
    
    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
    }
    
    const displayTitle = searchedQuery 
        ? `Search Results (${filteredJobs.length})` 
        : 'Search Jobs';
    
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <div className='flex w-[50%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto mb-8'>
                    <input
                        type="text"
                        placeholder='Search by title, location, or company'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
                        className='outline-none border-none w-full'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
                
                <h1 className='font-bold text-xl my-10'>{displayTitle}</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        searchedQuery ? (
                            filteredJobs.length > 0 ? (
                                filteredJobs.map((job) => {
                                    return (
                                        <Job key={job._id} job={job}/>
                                    )
                                })
                            ) : (
                                <div className='col-span-3 text-center text-gray-500 py-10'>
                                    No jobs found matching your search.
                                </div>
                            )
                        ) : (
                            <div className='col-span-3 text-center text-gray-400 py-10'>
                                Enter a search term to find jobs
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default Browse