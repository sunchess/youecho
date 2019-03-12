defmodule Youecho.DialogsTest do
  use Youecho.DataCase

  alias Youecho.Dialogs

  describe "dialogs" do
    alias Youecho.Dialogs.Question

    @valid_attrs %{answer: "some answer", answer_pronounce: true, iterate_count: 42, question: "some question"}
    @update_attrs %{answer: "some updated answer", answer_pronounce: false, iterate_count: 43, question: "some updated question"}
    @invalid_attrs %{answer: nil, answer_pronounce: nil, iterate_count: nil, question: nil}

    def question_fixture(attrs \\ %{}) do
      {:ok, question} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Dialogs.create_question()

      question
    end

    test "list_dialogs/0 returns all dialogs" do
      question = question_fixture()
      assert Dialogs.list_dialogs() == [question]
    end

    test "get_question!/1 returns the question with given id" do
      question = question_fixture()
      assert Dialogs.get_question!(question.id) == question
    end

    test "create_question/1 with valid data creates a question" do
      assert {:ok, %Question{} = question} = Dialogs.create_question(@valid_attrs)
      assert question.answer == "some answer"
      assert question.answer_pronounce == true
      assert question.iterate_count == 42
      assert question.question == "some question"
    end

    test "create_question/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Dialogs.create_question(@invalid_attrs)
    end

    test "update_question/2 with valid data updates the question" do
      question = question_fixture()
      assert {:ok, %Question{} = question} = Dialogs.update_question(question, @update_attrs)
      assert question.answer == "some updated answer"
      assert question.answer_pronounce == false
      assert question.iterate_count == 43
      assert question.question == "some updated question"
    end

    test "update_question/2 with invalid data returns error changeset" do
      question = question_fixture()
      assert {:error, %Ecto.Changeset{}} = Dialogs.update_question(question, @invalid_attrs)
      assert question == Dialogs.get_question!(question.id)
    end

    test "delete_question/1 deletes the question" do
      question = question_fixture()
      assert {:ok, %Question{}} = Dialogs.delete_question(question)
      assert_raise Ecto.NoResultsError, fn -> Dialogs.get_question!(question.id) end
    end

    test "change_question/1 returns a question changeset" do
      question = question_fixture()
      assert %Ecto.Changeset{} = Dialogs.change_question(question)
    end
  end
end
