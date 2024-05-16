import recepieSchema from '../models/recepie.js';
import { uploadOnCloudinary } from '../services/cloudinary.js';

export async function addReceipe(req, res) {
  const data = { ...req?.body };

  const { title, ingredients, instructions, email } = JSON.parse(data?.data);

  let imageResponse;
  if (req?.file?.path) {
    try {
      imageResponse = await uploadOnCloudinary(req?.file?.path);
    } catch (error) {
      return res.status(200).send({ message: error?.message });
    }
  }

  try {
    await recepieSchema.create({
      title,
      ingredients,
      instructions,
      email,
      recepieImg: imageResponse?.url,
    });
    return res
      .status(200)
      .json({ status: 200, message: 'Recepie added successfully!' });
  } catch (error) {
    return res.status(400).send({
      message: error?.message,
    });
  }
}

export async function getReceipe(req, res) {
  let response;

  const { search } = req?.query;

  try {
    response = await recepieSchema.find({
      title: { $regex: search, $options: 'i' },
    });

    return res.status(200).send({ data: response });
  } catch (error) {
    return res.status(400).send({ message: error?.message });
  }
}

export async function deleteRecepie(req, res) {
  const { id } = req?.body;

  try {
    await recepieSchema.findByIdAndDelete(id);
    return res.status(200).send({ message: 'Recepie deleted sucessfully !' });
  } catch (error) {
    return res.status(400).send({ message: error?.message });
  }
}

export async function updateRecepie(req, res) {
  const data = { ...req?.body };

  const { title, ingredients, instructions, _id, email } = JSON.parse(
    data?.data
  );

  let imageResponse;
  if (req?.file?.path) {
    try {
      imageResponse = await uploadOnCloudinary(req?.file?.path);
    } catch (error) {
      return res.status(200).send({ message: error?.message });
    }
  }

  try {
    await recepieSchema.findByIdAndUpdate(_id, {
      title,
      ingredients,
      instructions,
      recepieImg: imageResponse?.url,
      email,
    });
    return res
      .status(200)
      .send({ status: 200, message: 'Recepie Updated sucessfully !' });
  } catch (error) {
    return res.status(400).send({ message: error?.message });
  }
}

export async function updateRecepieForLikes(req, res) {
  const { id } = req?.body;

  try {
    await recepieSchema.findByIdAndUpdate(
      id,
      {
        $push: { likes: req?.user?._id },
      },
      { new: true }
    );

    return res.status(200).send({ status: 200, message: 'Liked !' });
  } catch (error) {
    return res.status(400).send({ message: error?.message });
  }
}

export async function updateRecepieForDisLike(req, res) {
  const { id } = req?.body;

  try {
    await recepieSchema.findByIdAndUpdate(
      id,
      {
        $pull: { likes: req?.user?._id },
      },
      { new: true }
    );

    return res.status(200).send({ status: 200, message: 'Disliked!' });
  } catch (error) {
    return res.status(400).send({ message: error?.message });
  }
}
