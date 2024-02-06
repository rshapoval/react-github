import React, { useEffect, useState } from 'react'
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from '../store/github/github.api'
import { useDebounce } from '../hooks/useDebounce'
import { RepoCard } from '../components/RepoCard'

export function HomePage() {
  const [search, setSearch] = useState('')
  const [dropdown, setDropdown] = useState(false)
  const debounced = useDebounce(search)
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  })

  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery()

  const clickHandler = (username: string) => {
    fetchRepos(username)
    setDropdown(false)
  }

  useEffect(() => {
    setDropdown(
      debounced.length > 3 && data?.length !== undefined && data.length > 0,
    )
  }, [debounced, data])

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && (
        <p className="text-center text-red-600">Something went wrong...</p>
      )}

      <div className="relative w-[560px]">
        <input
          className="border py-2 px-4 w-full h-[42px] mb-2"
          type="text"
          placeholder="Search for Github username..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {dropdown && (
          <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-auto">
            {isLoading && <li>Loading...</li>}
            {data?.map(user => (
              <li
                key={user.id}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                onClick={() => clickHandler(user.login)}
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
        <div className="container">
          {areReposLoading && <p>Repos are loading...</p>}
          {repos?.map(repo => <RepoCard key={repo.id} repo={repo} />)}
        </div>
      </div>
    </div>
  )
}
