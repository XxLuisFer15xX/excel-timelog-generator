import { useEffect, useState } from 'react'
import { TablePaginationProps } from '@types'

// Components
import { IconButtonCustom, TextCustom } from '@atoms'

// Assets
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

// Core
import { getPagination } from '@core/utils'

const TablePagination = ({
  canPreviousPage = false,
  canNextPage = false,
  gotoPage = () => null,
  nextPage = () => null,
  pageIndex = 0,
  pageOptions = [],
  previousPage = () => null,
  isResetPagina = false,
  setIsResetPagina = () => null,
}: TablePaginationProps) => {
  const [pagesShow, setPagesShow] = useState<number[]>([])

  useEffect(() => {
    const pagination = getPagination(pageOptions, pageIndex, 2)
    setPagesShow(pagination)
  }, [pageOptions, pageIndex])

  useEffect(() => {
    if (isResetPagina) {
      setIsResetPagina(false)
      gotoPage(0)
    }
  }, [isResetPagina])

  return (
    <div className="flex justify-center items-center mt-5">
      <IconButtonCustom
        icon={<ArrowBackIosIcon fontSize="large" className="fill-primary" />}
        onClick={previousPage}
        disabled={!canPreviousPage}
      />
      {pagesShow.map((page, index) => (
        <div
          key={index}
          className={`flex justify-center items-center mx-1 w-6 h-6 cursor-pointer rounded-md ${
            pageIndex === page ? 'text-white bg-general' : 'text-general'
          }`}
          onClick={() => page !== -1 && gotoPage(page)}
        >
          <TextCustom
            text={page === -1 ? '...' : (page + 1).toString()}
            className="text-center text-sm"
          />
        </div>
      ))}
      <IconButtonCustom
        icon={<ArrowForwardIosIcon fontSize="large" className="fill-primary" />}
        onClick={nextPage}
        disabled={!canNextPage}
      />
    </div>
  )
}

export default TablePagination
