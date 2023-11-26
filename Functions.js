async function visualizeSorting() {
    const selectedAlgorithm = document.getElementById('algorithm-select').value;

    // Reset comparison counter
    comparisons = 0;
    updateComparisonCounter();
      // Call the selected sorting algorithm
      switch (selectedAlgorithm) {
        case 'bubble':
          await visualizeBubbleSort();
          break;
        case 'selection':
          await visualizeSelectionSort();
          break;
        case 'merge':
          await visualizeMergeSort();
          break;
        
        case 'quick':
          await visualizeQuickSort();
          break;
        default:
          console.error('Invalid algorithm selection');
      }

      alert('Sorting complete!');
    }

   
   
   // Generate a random array
    const array = Array.from({ length: 40 }, () => Math.floor(Math.random() * 100) + 1);
    let comparisons = 0;
    
    // Function to create bars for each array element
    function renderArray() {
      const arrayContainer = document.getElementById('array-container');
      arrayContainer.innerHTML = '';
      array.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'array-bar';
        bar.style.height = `${value * 3}px`; // Adjust the height for better visualization
        bar.innerText = value;
        arrayContainer.appendChild(bar);
      });
    }

    // Function to update the comparison counter
    function updateComparisonCounter() {
      document.getElementById('comparison-counter').innerText = `Comparisons: ${comparisons}`;
    }

    // Quick Sort algorithm
    async function quickSort(start, end) {
      if (start < end) {
        // Partition the array and get the pivot index
        const pivotIndex = await partition(start, end);

        // Recursively sort the subarrays
        await quickSort(start, pivotIndex - 1);
        await quickSort(pivotIndex + 1, end);
      }
    }

    // Partition function for Quick Sort
    async function partition(start, end) {
      const pivotValue = array[end];
      let i = start - 1;

      for (let j = start; j < end; j++) {
        comparisons++; // Increment comparison counter
        updateComparisonCounter();

        if (array[j] <= pivotValue) {
          i++;
          // Swap array elements
          [array[i], array[j]] = [array[j], array[i]];
          renderArray();
          await sleep(100); // Delay for visualization
        }
      }

      // Swap the pivot element with the element at (i + 1)
      [array[i + 1], array[end]] = [array[end], array[i + 1]];
      renderArray();
      await sleep(100); // Delay for visualization

      return i + 1;
    }

    async function mergeSort(start, end) {
      if (start < end) {
        const middle = Math.floor((start + end) / 2);

        // Recursively sort the subarrays
        await mergeSort(start, middle);
        await mergeSort(middle + 1, end);

        // Merge the sorted subarrays
        await merge(start, middle, end);
      }
    }

    // Merge function for Merge Sort
    async function merge(start, middle, end) {
      const leftArray = array.slice(start, middle + 1);
      const rightArray = array.slice(middle + 1, end + 1);
      let i = 0,
          j = 0,
          k = start;

      while (i < leftArray.length && j < rightArray.length) {
        comparisons++; // Increment comparison counter
        updateComparisonCounter();

        if (leftArray[i] <= rightArray[j]) {
          array[k++] = leftArray[i++];
        } else {
          array[k++] = rightArray[j++];
        }
        renderArray();
        await sleep(100); // Delay for visualization
      }

      while (i < leftArray.length) {
        array[k++] = leftArray[i++];
        renderArray();
        await sleep(100); // Delay for visualization
      }

      while (j < rightArray.length) {
        array[k++] = rightArray[j++];
        renderArray();
        await sleep(100); // Delay for visualization
      }
    }

    async function bubbleSort() {
      let n = array.length;
      let swapped;
      do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
          comparisons++; // Increment comparison counter
          updateComparisonCounter();

          if (array[i] > array[i + 1]) {
            // Swap array elements
            [array[i], array[i + 1]] = [array[i + 1], array[i]];
            swapped = true;
            renderArray();
            await sleep(100); // Delay for visualization
          }
        }
        n--;
      } while (swapped);
    }

    async function heapSort() {
      const n = array.length;

      // Build max heap
      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
      }

      // Extract elements from the heap
      for (let i = n - 1; i > 0; i--) {
        // Swap the root (maximum element) with the last element
        [array[0], array[i]] = [array[i], array[0]];
        renderArray();
        await sleep(100); // Delay for visualization

        // Heapify the reduced heap
        await heapify(i, 0);
      }
    }

    // Heapify function for Heap Sort
    async function heapify(n, i) {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n) {
        comparisons++; // Increment comparison counter
        updateComparisonCounter();

        if (array[left] > array[largest]) {
          largest = left;
        }
      }

      if (right < n) {
        comparisons++; // Increment comparison counter
        updateComparisonCounter();

        if (array[right] > array[largest]) {
          largest = right;
        }
      }

      if (largest !== i) {
        // Swap array elements
        [array[i], array[largest]] = [array[largest], array[i]];
        renderArray();
        await sleep(100); // Delay for visualization

        // Recursively heapify the affected sub-tree
        await heapify(n, largest);
      }
    }

    async function selectionSort() {
      const n = array.length;

      for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
          comparisons++; // Increment comparison counter
          updateComparisonCounter();

          if (array[j] < array[minIndex]) {
            minIndex = j;
          }
        }

        // Swap the found minimum element with the element at index i
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        renderArray();
        await sleep(100); // Delay for visualization
      }
    }

    // Function to visualize Selection Sort
    async function visualizeSelectionSort() {
      comparisons = 0; // Reset comparison counter
      updateComparisonCounter();
      await selectionSort();
      alert('Sorting complete!');
    }

    // Function to visualize Heap Sort
    async function visualizeHeapSort() {
      comparisons = 0; // Reset comparison counter
      updateComparisonCounter();
      await heapSort();
      alert('Sorting complete!');
    }


    // Function to visualize Bubble Sort
    async function visualizeBubbleSort() {
      comparisons = 0; // Reset comparison counter
      updateComparisonCounter();
      await bubbleSort();
      alert('Sorting complete!');
    }


    // Function to visualize Merge Sort
    async function visualizeMergeSort() {
      comparisons = 0; // Reset comparison counter
      updateComparisonCounter();
      await mergeSort(0, array.length - 1);
      alert('Sorting complete!');
    }


    // Function to visualize Quick Sort
    async function visualizeQuickSort() {
      comparisons = 0; // Reset comparison counter
      updateComparisonCounter();
      await quickSort(0, array.length - 1);
      alert('Sorting complete!');
    }

    // Helper function for sleep
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Initial rendering of the array
    renderArray();
