import React, { useEffect, useState } from 'react'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setJobsPageFilter } from '@/redux/jobSlice'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedFilters, setSelectedFilters] = useState([]);
    const dispatch = useDispatch();
    
    const toggleFilter = (value) => {
        setSelectedFilters(prev => {
            if (prev.includes(value)) {
                // Deselect if already selected
                return prev.filter(item => item !== value);
            } else {
                // Add to selection
                return [...prev, value];
            }
        });
    }
    
    const applyFilters = () => {
        // Join all selected filters with | for OR logic
        const filterQuery = selectedFilters.join(',');
        dispatch(setJobsPageFilter(filterQuery));
    }
    
    const clearAllFilters = () => {
        setSelectedFilters([]);
        dispatch(setJobsPageFilter(""));
    }
    
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-lg'>Filter Jobs</h1>
                {selectedFilters.length > 0 && (
                    <Button 
                        onClick={clearAllFilters} 
                        variant="ghost" 
                        size="sm"
                        className="text-xs text-red-500 hover:text-red-700"
                    >
                        Clear All
                    </Button>
                )}
            </div>
            <hr className='mt-3' />
            
            <div className='space-y-4'>
                {
                    fitlerData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `filter-${index}-${idx}`;
                                    const isChecked = selectedFilters.includes(item);
                                    
                                    return (
                                        <div key={itemId} className='flex items-center space-x-2 my-2'>
                                            <Checkbox 
                                                id={itemId}
                                                checked={isChecked}
                                                onCheckedChange={() => toggleFilter(item)}
                                            />
                                            <Label 
                                                htmlFor={itemId}
                                                className="cursor-pointer"
                                            >
                                                {item}
                                            </Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </div>
            
            <Button 
                onClick={applyFilters} 
                className="w-full mt-4 bg-[#6A38C2] hover:bg-[#5b30a6]"
                disabled={selectedFilters.length === 0}
            >
                Apply Filters
            </Button>
        </div>
    )
}

export default FilterCard