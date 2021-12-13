package com.example.sumon.androidvolley;

import android.app.Activity;
import android.app.ProgressDialog;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.view.View.OnClickListener;
import android.widget.EditText;
import android.widget.TextView;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonObjectRequest;
import com.example.sumon.androidvolley.app.AppController;
import com.example.sumon.androidvolley.utils.Const;

import org.json.JSONObject;

public class CreateAccountActivity extends Activity implements OnClickListener {
    private String TAG = CreateAccountActivity.class.getSimpleName();
    private Button btnCreate;
    private ProgressDialog pDialog;

    private EditText editName, editEmail, editUsername, editPassword, editConfirmPassword, editLocation;
    private String name = "Filler";
    private String email = "filler@email.com";
    private String username = "filler123";
    private String password = "12345!";
    private String location = "Iowa";
    private String confirmPassword = "12345!";


    private String tag_json_obj = "jobj_req";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.create_acct_request);

        btnCreate = (Button) findViewById(R.id.btnCreate);

        pDialog = new ProgressDialog(this);
        pDialog.setMessage("Loading...");
        pDialog.setCancelable(false);

        btnCreate.setOnClickListener(this);

        editName = (EditText) findViewById(R.id.editName);
        editEmail = (EditText) findViewById(R.id.editEmail);
        editUsername = (EditText) findViewById(R.id.editUsername);
        editPassword = (EditText) findViewById(R.id.editPassword);
        editConfirmPassword = (EditText) findViewById(R.id.editConfirmPassword);
        editLocation = (EditText) findViewById(R.id.editLocation);
    }

    private void showProgressDialog() {
        if (!pDialog.isShowing())
            pDialog.show();
    }
    private void hideProgressDialog() {
        if (pDialog.isShowing())
            pDialog.hide();
    }

    /**
     * Making json object request
     * */
    private void makeJsonObjReq() {
        String urlName = Const.URL_REGISTER + "name=" + name + "&email=" + email;
        String urlUsername = Const.URL_REGISTER + "username=" + username + "&password=" + password;

        showProgressDialog();
        JsonObjectRequest jsonObjReq = new JsonObjectRequest(Request.Method.POST,
                urlName , null,
                new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject response) {
                        Log.d(TAG, response.toString());
                        hideProgressDialog();
                    }
                }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {
                VolleyLog.d(TAG, "Error: " + error.getMessage());
                hideProgressDialog();
            }
        });

        JsonObjectRequest jsonObjReq2 = new JsonObjectRequest(Request.Method.POST,
                urlUsername , null,
                new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject response) {
                        Log.d(TAG, response.toString());
                        hideProgressDialog();
                    }
                }, new Response.ErrorListener() {

            @Override
            public void onErrorResponse(VolleyError error) {
                VolleyLog.d(TAG, "Error: " + error.getMessage());
                hideProgressDialog();
            }
        });

        // Adding request to request queue
        AppController.getInstance().addToRequestQueue(jsonObjReq,
                tag_json_obj);
        AppController.getInstance().addToRequestQueue(jsonObjReq2,
                tag_json_obj);

        // Cancelling request
        // ApplicationController.getInstance().getRequestQueue().cancelAll(tag_json_obj);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btnCreate:
                name = editName.getText().toString();
                email = editEmail.getText().toString();
                location = editLocation.getText().toString();
                username = editUsername.getText().toString();
                password = editPassword.getText().toString();
                confirmPassword = editConfirmPassword.getText().toString();

                //subject to change, need to compare these two so it's approved
                if (password == confirmPassword){

                }

                makeJsonObjReq();
                break;
        }

    }
}
