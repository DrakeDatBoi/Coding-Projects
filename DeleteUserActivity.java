package com.example.sumon.androidvolley.Admin;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.JsonObjectRequest;
import com.example.sumon.androidvolley.R;
import com.example.sumon.androidvolley.app.AppController;
import com.example.sumon.androidvolley.utils.Const;

import org.json.JSONObject;

/**
 * The type Create account activity.
 */
public class DeleteUserActivity extends Activity implements OnClickListener {
    private String TAG = DeleteUserActivity.class.getSimpleName();
    private Button btnDeleteID;
    private ProgressDialog pDialog;

    private String username = "filler123";
    private EditText editUserID;

    private String tag_json_obj = "jobj_req";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.deleteuser);

        btnDeleteID = (Button) findViewById(R.id.btnDeleteID);

        pDialog = new ProgressDialog(this);
        pDialog.setMessage("Loading...");
        pDialog.setCancelable(false);

        btnDeleteID.setOnClickListener(this);

        editUserID = (EditText) findViewById(R.id.editUserID);
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
     * Making json object request in order to create a account and add to backend
     * */

    private void makeJsonObjReqRmv() {
        String urlUsername = Const.URL_DEL + username;

        showProgressDialog();
        JsonObjectRequest jsonObjReq = new JsonObjectRequest(Request.Method.DELETE,
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
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btnDeleteID:

                username = editUserID.getText().toString();

                makeJsonObjReqRmv();
                startActivity(new Intent(DeleteUserActivity.this,
                        AdminActivity.class));
                break;
        }

    }
}
