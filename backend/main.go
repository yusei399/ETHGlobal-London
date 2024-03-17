// main.go
package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"os"
)

func main() {
	http.HandleFunc("/api/verify", func(w http.ResponseWriter, r *http.Request) {
		var proof ISuccessResult
		if err := json.NewDecoder(r.Body).Decode(&proof); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		verifyRes, err := verifyProof(proof)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		if verifyRes.StatusCode != http.StatusOK {
			http.Error(w, "Verification failed", verifyRes.StatusCode)
			return
		}

		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(map[string]string{
			"message": "Verification successful",
		})
	})

	http.ListenAndServe(":8080", nil)
}

func verifyProof(proof ISuccessResult) (*http.Response, error) {
	requestBody, _ := json.Marshal(proof)
	return http.Post(
		"https://developer.worldcoin.org/api/v1/verify/"+os.Getenv("NEXT_PUBLIC_WLD_APP_ID"),
		"application/json",
		bytes.NewBuffer(requestBody),
	)
}

type ISuccessResult struct {
	MerkleRoot        string `json:"merkle_root"`
	NullifierHash     string `json:"nullifier_hash"`
	Proof             string `json:"proof"`
	VerificationLevel string `json:"verification_level"`
	Action            string `json:"action"`
	Signal            string `json:"signal"`
}
