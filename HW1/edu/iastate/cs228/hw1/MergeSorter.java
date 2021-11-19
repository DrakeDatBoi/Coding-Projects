package edu.iastate.cs228.hw1;

import java.io.FileNotFoundException;
import java.lang.NumberFormatException; 
import java.lang.IllegalArgumentException; 
import java.util.InputMismatchException;

/**
 *  
 * @author Drake Ridgeway
 *
 */

/**
 * 
 * This class implements the mergesort algorithm.   
 *
 */

public class MergeSorter extends AbstractSorter
{
	// Other private instance variables if you need ... 
	
	/** 
	 * Constructor takes an array of points.  It invokes the superclass constructor, and also 
	 * set the instance variables algorithm in the superclass.
	 *  
	 * @param pts   input array of integers
	 */
	public MergeSorter(Point[] pts) 
	{
		// TODO  
		super(pts);
		algorithm = Algorithm.MergeSort.toString();
	}


	/**
	 * Perform mergesort on the array points[] of the parent class AbstractSorter. 
	 * 
	 */
	@Override 
	public void sort()
	{
		// TODO 
		mergeSortRec(points);
	}

	
	/**
	 * This is a recursive method that carries out mergesort on an array pts[] of points. One 
	 * way is to make copies of the two halves of pts[], recursively call mergeSort on them, 
	 * and merge the two sorted subarrays into pts[].   
	 * 
	 * @param pts	point array 
	 */
	private void mergeSortRec(Point[] pts)
	{
		if (pts.length < 2) {
			return;
		}
		int mid = pts.length / 2;
		Point[] ptsLeft = new Point[mid];
		Point[] ptsRight = new Point[pts.length - mid];
		
		for (int i = 0; i < mid; i++) {
			ptsLeft[i] = pts[i];
		}
		for (int i = mid; i < pts.length; i++) {
			ptsRight[i - mid] = pts[i];
		}
		
		mergeSortRec(ptsLeft);
		mergeSortRec(ptsRight);
		mergeArrays(ptsLeft, ptsRight, pts);
		
		
	}

	
	// Other private methods in case you need ...
	private void mergeArrays(Point arr1[], Point arr2[], Point mergedArray[]) {
		
		int min = Math.min(arr1.length, arr2.length);
		int i = 0;
		int j = 0;
		int k = 0;
		
		for (i = 0; i < min; i++) {
			if (pointComparator.compare(arr1[i], arr2[i]) == -1) {
				mergedArray[i] = arr1[j];
				j++;
			} else {
				mergedArray[i] = arr2[k];
				k++;
			}
		}
		
		for(j = 0; j < arr1.length; j++) {
			mergedArray[i] = arr1[j];
		}
		
		for(k = 0; k < arr1.length; k++) {
			mergedArray[i] = arr1[k];
		}
	}
}
