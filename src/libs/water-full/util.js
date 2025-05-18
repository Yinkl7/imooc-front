export const getImgElements = (elementList) => {
  const imgElements = []
  elementList.forEach((ele) => {
    imgElements.push(...ele.getElementsByTagName('img'))
  })
  return imgElements
}

/**
 * 生成所有图片链接数组
 */
export const getAllImg = (imgElements) => {
  return imgElements.map((img) => img.src)
}

export const onComplateImgs = (imgsList) => {
  const promiseList = []
  imgsList.forEach((img, index) => {
    promiseList[index] = new Promise((resolve, reject) => {
      const image = new Image()
      image.src = img
      image.onload = () => {
        resolve({
          img,
          index
        })
      }

      image.onerror = () => {
        resolve({
          img,
          index
        })
      }
    })
  })

  return Promise.all(promiseList)
}

export const getMinHeight = (columnHeightObj) => {
  const heightList = Object.values(columnHeightObj)
  return Math.min(...heightList)
}

export const getMaxHeight = (columnHeightObj) => {
  const heightList = Object.values(columnHeightObj)
  return Math.max(...heightList)
}

export const getMinHeightColumn = (columnHeightObj) => {
  const minHeight = getMinHeight(columnHeightObj)
  return Object.keys(columnHeightObj).find((key) => {
    return columnHeightObj[key] === minHeight
  })
}
