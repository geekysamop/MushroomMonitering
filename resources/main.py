import csv
import math
import random

# Read data from csv file
def read_csv(file_path):
    data = []
    with open(file_path, 'r') as csvfile:
        csvreader = csv.reader(csvfile)
        next(csvreader) # skip header row
        for row in csvreader:
            data.append(row)
    return data

# Split data into training and testing sets
def split_data(data, split_ratio):
    train_size = int(len(data) * split_ratio)
    train_set = []
    test_set = list(data)
    while len(train_set) < train_size:
        index = random.randrange(len(test_set))
        train_set.append(test_set.pop(index))
    return [train_set, test_set]

# Train Naive Bayes classifier
def train_classifier(train_set):
    spam_messages = []
    ham_messages = []
    for message in train_set:
        if message[-1] == '1':
            spam_messages.append(message)
        else:
            ham_messages.append(message)
    # Get total number of messages
    num_spam = len(spam_messages)
    num_ham = len(ham_messages)
    total_messages = num_spam + num_ham
    # Calculate class priors
    spam_prior = num_spam / total_messages
    ham_prior = num_ham / total_messages
    # Initialize dictionaries for word counts
    spam_counts = {}
    ham_counts = {}
    # Iterate through all messages and update word counts
    for message in spam_messages:
        for i in range(1, len(message) - 1):
            word_count = int(message[i])
            word = str(i)
            spam_counts[word] = spam_counts.get(word, 0) + word_count
    for message in ham_messages:
        for i in range(1, len(message) - 1):
            word_count = int(message[i])
            word = str(i)
            ham_counts[word] = ham_counts.get(word, 0) + word_count
    # Calculate likelihoods
    spam_likelihood = {}
    ham_likelihood = {}
    for word in spam_counts:
        spam_likelihood[word] = (spam_counts[word] + 1) / (sum(spam_counts.values()) + len(spam_counts))
    for word in ham_counts:
        ham_likelihood[word] = (ham_counts[word] + 1) / (sum(ham_counts.values()) + len(ham_counts))
    return [spam_prior, ham_prior, spam_likelihood, ham_likelihood]

# Classify new message
def classify_message(message, spam_prior, ham_prior, spam_likelihood, ham_likelihood):
    # Convert message to word counts
    words = message[1:-1]
    word_counts = {str(i): int(words[i-1]) for i in range(1, len(words)+1)}
    # Calculate score for spam and ham classes
    spam_score = math.log(spam_prior)
    ham_score = math.log(ham_prior)
    for word, count in word_counts.items():
        if word in spam_likelihood:
            spam_score += math.log(spam_likelihood[word]) * count
        else:
            spam_score += math.log(1e-6) * count
        if word in ham_likelihood:
            ham_score += math.log(ham_likelihood[word]) * count
        else:
            ham_score += math.log(1e-6) * count
    # Classify message based on score
    if spam_score > ham_score:
        return 'spam'
    else:
        return 'ham'

# Evaluate classifier on test set
def evaluate_classifier(test_set, spam_prior, ham_prior, spam_likelihood, ham_likelihood):
    true_positives = 0
    false_positives = 0
    true_negatives = 0
    false_negatives = 0
    for message in test_set:
        actual_label = message[-1]
        predicted_label = classify_message(message, spam_prior, ham_prior, spam_likelihood, ham_likelihood)
        if actual_label == '1' and predicted_label == 'spam':
          true_positives += 1
        elif actual_label == '0' and predicted_label == 'spam':
          false_positives += 1
        elif actual_label == '0' and predicted_label == 'ham':
          true_negatives += 1
        elif actual_label == '1' and predicted_label == 'ham':
          false_negatives += 1
    # Calculate evaluation metrics
    accuracy = (true_positives + true_negatives) / len(test_set)
    precision = true_positives / (true_positives + false_positives)
    recall = true_positives / (true_positives + false_negatives)
    f1_score = 2 * (precision * recall) / (precision + recall)
    print(f'Accuracy: {accuracy:.2f}')
    print(f'Precision: {precision:.2f}')
    print(f'Recall: {recall:.2f}')
    print(f'F1 Score: {f1_score:.2f}')


def main():
    file_path = 'emails.csv'
    data = read_csv(file_path)
    train_set, test_set = split_data(data, split_ratio=0.8)
    spam_prior, ham_prior, spam_likelihood, ham_likelihood = train_classifier(train_set)
    evaluate_classifier(test_set, spam_prior, ham_prior, spam_likelihood, ham_likelihood)


main()

  
