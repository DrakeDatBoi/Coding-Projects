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
 * This class implements insertion sort.   
 *
 */

public class InsertionSorter extends AbstractSorter 
{
	// Other private instance variables if you need ... 
	
	/**
	 * Constructor takes an array of points.  It invokes the superclass constructor, and also 
	 * set the instance variables algorithm in the superclass.
	 * 
	 * @param pts  
	 */
	public InsertionSorter(Point[] pts) 
	{
		// TODO
		super(pts);
		algorithm = Algorithm.InsertionSort.toString();
	}	

	
	/** 
	 * Perform insertion sort on the array points[] of the parent class AbstractSorter.  
	 */
	@Override 
	public void sort()
	{
		// TODO 
		for (int i = 0; i < points.length; i++) {
			Point temp = points[i];
			int j = i - 1;
			while (j >= 0 && pointComparator.compare(points[j], temp) == 1) {
				points[j + 1] = points[j];
				j = j - 1;
			}
			points[j + 1] = temp;
		}
	}
}		

