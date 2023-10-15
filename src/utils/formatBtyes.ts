export const formatBytes = (bytes: number) => {
    if (typeof bytes === 'string') bytes = parseInt(bytes)
    if (isNaN(bytes) || bytes === 0) return ''
    const marker = 1024
    const decimal = 3
    const kiloBytes = marker
    const megaBytes = marker * marker
    const gigaBytes = marker * marker * marker
  
    // return bytes if less than a KB
    if (bytes < kiloBytes) return ` (${bytes} Bytes)`
    // return KB if less than a MB
    else if (bytes < megaBytes) return ` (${(bytes / kiloBytes).toFixed(decimal)} KB)`
    // return MB if less than a GB
    else if (bytes < gigaBytes) return ` (${(bytes / megaBytes).toFixed(decimal)} MB)`
    // return GB if less than a TB
    else return ` (${(bytes / gigaBytes).toFixed(decimal)} GB)`
  }


  