package edu.iastate.cs228.hw1;

/**
 *  
 * @author Drake Ridgeway
 *
 */

import java.util.Comparator;
import java.io.FileNotFoundException;
import java.lang.IllegalArgumentException; 
import java.util.InputMismatchException;

/**
 * 
 * This abstract class is extended by SelectionSort, InsertionSort, MergeSort, and QuickSort.
 * It stores the input (later the sorted) sequence. 
 *
 */
public abstract class AbstractSorter
{
	
	protected Point[] points;    // array of points operated on by a sorting algorithm. 
	                             // stores ordered points after a call to sort(). 
	
	protected String algorithm = null; // "selection sort", "insertion sort", "mergesort", or
	                                   // "quicksort". Initialized by a subclass constructor.
		 
	protected Comparator<Point> pointComparator = null;  
	
	
	// Add other protected or private instance variables you may need. 
	

	protected AbstractSorter()
	{
		// No implementation needed. Provides a default super constructor to subclasses. 
		// Removable after implementing SelectionSorter, InsertionSorter, MergeSorter, and QuickSorter.
	}
	
	
	/**
	 * This constructor accepts an array of points as input. Copy the points into the array points[]. 
	 * 
	 * @param  pts  input array of points 
	 * @throws IllegalArgumentException if pts == null or pts.length == 0.
	 */
	protected AbstractSorter(Point[] pts) throws IllegalArgumentException
	{
		// TODO
		if(pts.length < 0 || pts == null) {
			throw new IllegalArgumentException("points is either negative or null");
		}
		points = new Point[pts.length];
		for (int i = 0; i < pts.length; i++) {
			points[i] = pts[i];	
			}
	}

		
	
	
	

	/**
	 * Generates a comparator on the fly that compares by x-coordinate if order == 0, by y-coordinate
	 * if order == 1. Assign the 
     * comparator to the variable pointComparator. 
     * 
	 * 
	 * Need to create an object of the PolarAngleComparator class and call the compareTo() method in the 
	 * Point class.  
	 * 
	 * @param order  0   by x-coordinate 
	 * 				 1   by y-coordinate
	 * 			    
	 * 
	 * @throws IllegalArgumentException if order is less than 0 or greater than 1
	 *        
	 */
	
	class PolarAngleComparator implements Comparator<Point>{
		
		boolean XorY;
		
		public PolarAngleComparator(boolean xORy) {
			
			XorY = xORy;
		}

		@Override
		public int compare(Point x, Point y) {
			
			x.setXorY(XorY); 
			return x.compareTo(y);
		}
		
	}
	
	public void setComparator(int order) throws IllegalArgumentException
	{
		// TODO
		try {
			if (order == 0) {
				pointComparator = new PolarAngleComparator(true);
			}
			if (order == 1) {
				pointComparator = new PolarAngleComparator(false);
			}
		}
		catch (IllegalArgumentException i) {
			System.out.println("ERROR: Illegal Argument Exception.");
		}
	}

	

	/**
	 * Use the created pointComparator to conduct sorting.  
	 * 
	 * Ought to be protected. Made public for testing. 
	 */
	public abstract void sort(); 
	
	
	/**
	 * Obtain the point in the array points[] that has median index 
	 * 
	 * @return	median point 
	 */
	public Point getMedian()
	{
		return points[points.length/2]; 
	}
	
	
	/**
	 * Copys the array points[] onto the array pts[]. 
	 * 
	 * @param pts
	 */
	public void getPoints(Point[] pts)
	{
		// TODO 
		for (int i = 0; i < pts.length; i++) {
			for (int j = 0; j < points.length; j++) {
				pts[i] = points[i];
				}
			}
	}
	

	/**
	 * Swaps the two elements indexed at i and j respectively in the array points[]. 
	 * 
	 * @param i
	 * @param j
	 */
	protected void swap(int i, int j)
	{
		// TODO 
		Point temp = points[i];
		points[i] = points[j];
		points[j] = temp;
		
	}	
	
}



