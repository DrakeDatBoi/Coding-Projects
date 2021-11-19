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
 * This class implements selection sort.   
 *
 */

public class SelectionSorter extends AbstractSorter
{
	// Other private instance variables if you need ... 
	
	/**
	 * Constructor takes an array of points.  It invokes the superclass constructor, and also 
	 * set the instance variables algorithm in the superclass.
	 *  
	 * @param pts  
	 */
	public SelectionSorter(Point[] pts)  
	{
		// TODO 
		super(pts);
		algorithm = Algorithm.SelectionSort.toString();
	}	

	
	/** 
	 * Apply selection sort on the array points[] of the parent class AbstractSorter.  
	 * 
	 */
	@Override 
	public void sort()
	{
		// TODO
		for (int i = 0; i < points.length; i++) {
			for (int j = 0; j < points.length; j++) {
			    pointComparator.compare(points[i], points[j]);
			    if (pointComparator.compare(points[i], points[j]) == -1) {
			    	swap(i, j);
			    }
			}
		}
    }
}	

